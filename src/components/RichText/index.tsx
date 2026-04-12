import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

/** Lexical element `format` → Tailwind text-align (boş = hizalama sınıfı yok) */
export function lexicalElementFormatToClass(format: string | null | undefined): string | undefined {
  if (format == null || format === '') return undefined
  const map: Record<string, string> = {
    left: 'text-left',
    start: 'text-start',
    center: 'text-center',
    right: 'text-right',
    end: 'text-end',
    justify: 'text-justify',
  }
  return map[format] ?? undefined
}

export type RichTextLexicalBlockClassNameFn = (args: {
  type: 'paragraph' | 'heading'
  tag?: string
  format?: string | null
}) => string | undefined

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const BLOCK_LEVEL_TYPES = new Set([
  'heading',
  'paragraph',
  'list',
  'listitem',
  'quote',
  'block',
  'table',
  'tablerow',
  'tablecell',
  'upload',
  'horizontalrule',
])

function hasBlockLevelChildren(children: any[]): boolean {
  if (!children) return false
  return children.some(
    (child) =>
      BLOCK_LEVEL_TYPES.has(child.type) ||
      (child.children && hasBlockLevelChildren(child.children)),
  )
}

function getLinkHref(node: SerializedLinkNode): string {
  const { fields } = node
  if (fields.linkType === 'internal' && fields.doc) {
    const { value, relationTo } = fields.doc
    if (typeof value === 'object' && value.slug) {
      return relationTo === 'posts' ? `/posts/${value.slug}` : `/${value.slug}`
    }
  }
  return fields.url || '#'
}

const buildJsxConverters = (
  getLexicalBlockClassName?: RichTextLexicalBlockClassNameFn,
): JSXConvertersFunction<NodeTypes> => ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const format = 'format' in node ? (node as { format?: string }).format : undefined
    const alignClass =
      lexicalElementFormatToClass(format) ??
      getLexicalBlockClassName?.({ type: 'paragraph', format }) ??
      undefined
    if (!children?.length) {
      return (
        <p className={alignClass}>
          <br />
        </p>
      )
    }
    return <p className={cn(alignClass)}>{children}</p>
  },
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const NodeTag = node.tag
    const format = 'format' in node ? (node as { format?: string }).format : undefined
    const alignClass =
      lexicalElementFormatToClass(format) ??
      getLexicalBlockClassName?.({ type: 'heading', tag: NodeTag, format }) ??
      undefined
    return <NodeTag className={cn(alignClass)}>{children}</NodeTag>
  },
  ...LinkJSXConverter({ internalDocToHref }),
  link: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    if (hasBlockLevelChildren(node.children)) {
      const href = getLinkHref(node)
      return (
        <div data-link-href={href} className="cursor-pointer">
          {children}
        </div>
      )
    }
    const href = getLinkHref(node)
    const isInternal = node.fields.linkType === 'internal'
    if (isInternal) {
      return <Link href={href}>{children}</Link>
    }
    return (
      <a href={href} target={node.fields.newTab ? '_blank' : undefined} rel="noopener noreferrer">
        {children}
      </a>
    )
  },
  autolink: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    if (hasBlockLevelChildren(node.children)) {
      return <div>{children}</div>
    }
    const href = node.fields.url || '#'
    return (
      <a href={href} target={node.fields.newTab ? '_blank' : undefined} rel="noopener noreferrer">
        {children}
      </a>
    )
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  /**
   * Paragraf/başlıkta Lexical `format` boşken eklenecek hizalama sınıfı (ör. blokta varsayılan justify/ortala).
   */
  getLexicalBlockClassName?: RichTextLexicalBlockClassNameFn
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, getLexicalBlockClassName, ...rest } =
    props
  return (
    <ConvertRichText
      converters={buildJsxConverters(getLexicalBlockClassName)}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
